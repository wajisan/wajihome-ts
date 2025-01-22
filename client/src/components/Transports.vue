<script lang="ts">
    import { defineComponent } from 'vue'

    type Hour = {
            time : string;
            arrive : string;
            name : string;
            duration : number;
        }
    export default defineComponent({
    
        props: {
            destination_url: {
                type: String,
                required: true
            },
            destination_label: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                transports: [] as Hour[],
                api: this.$server_url + '/transport'
            }
        },
        async created() {
            await this.getTransports();
            this.setDateFormat();
        },
        methods: {
            async getTransports() {
                const response = await fetch(this.api+this.destination_url);
                const data = await response.json();
                
                this.transports = Array.from(data.transports).slice(0, 4);
            },

            setDateFormat() {
                this.transports.map(obj => {
                    const arrivalTime : any = new Date(); // Crée un objet Date pour l'heure d'arrivée
                    const departureTime : any = new Date(); // Crée un objet Date pour l'heure de départ

                    // Décompose l'heure d'arrivée et de départ à partir des chaînes
                    const arriveTime : string[] = obj.arrive.split(':');
                    const departTime : string[] = obj.time.split(':');

                    // Définit les heures et les minutes pour l'heure d'arrivée
                    arrivalTime.setHours(parseInt(arriveTime[0]), parseInt(arriveTime[1]), 0, 0);
                    // Définit les heures et les minutes pour l'heure de départ
                    departureTime.setHours(parseInt(departTime[0]), parseInt(departTime[1]), 0, 0);

                    // Calcule la différence en minutes entre l'heure d'arrivée et l'heure de départ
                    const duration = Math.round(Math.abs(arrivalTime - departureTime) / (60 * 1000));

                    obj.duration = duration;
                });
            }

        }
    })
</script>
    
    <template>
      
    
      <div class="card" v-if="transports.length > 0">
        <h2>RER D 🚅</h2>
        <p>{{ destination_label }}</p>
        <div class="trans-container">
            <div v-for="(item, index) in transports" v-bind:key="'trans'+index" class="trans-item">
                <div :id="'trans'+index" v-if="item.time" class="trans-content">
                    <span>{{item.name}} 👨‍✈️</span>
                    <span>{{item.time}} 🕝</span>
                    <span>{{item.duration}} min ⏳</span>
                </div>    
            </div>
        </div>
      </div>
    </template>
    
    <style scoped>

    h2 {
        color: #0d8c5d;
    }
    .read-the-docs {
      color: #888;
    }

    .trans-content span {
        padding: 13px;
    }

    .trans-item:nth-child(even) {
        background:#d6d6d6;
    }
    </style>
    
