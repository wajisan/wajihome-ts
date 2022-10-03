<script lang="ts">
    import { defineComponent } from 'vue'

    type Hour = {
            departureTime : string;
            arrivalTime : string;
            trainNumber : string;
        }
    export default defineComponent({
    
        
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
                const response = await fetch(this.api);
                const data = await response.json();
                this.transports = data.map(a => a.item);
            },
            setDateFormat() {
                this.transports.map(obj => {
                    obj.departureTime = new Date(obj.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    obj.arrivalTime = new Date(obj.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                });
            }

        }
    })
</script>
    
    <template>
      
    
      <div class="card" v-if="transports.length > 0">
        <h2>Horaires des transports (RER E)</h2>
        <p>Villiers sur marne - direction haussman st lazare</p>
        <div v-for="(item, index) in transports" v-bind:key="'trans'+index">
            <span :id="'trans'+index" v-if="item.trainNumber"> {{item.departureTime}} - {{item.arrivalTime}} - {{item.trainNumber}}</span>
            <hr/>
        </div>
      </div>
    </template>
    
    <style scoped>
    .read-the-docs {
      color: #888;
    }
    </style>
    
