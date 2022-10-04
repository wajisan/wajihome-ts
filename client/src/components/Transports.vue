<script lang="ts">
    import { defineComponent } from 'vue'

    type Hour = {
            departureTime : string;
            arrivalTime : string;
            trainNumber : string;
            duration : number;
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
                    const tmpArrival : any = new Date(obj.arrivalTime);
                    const tmpDeparture : any = new Date(obj.departureTime);
                    obj.duration = Math.round(
                        Math.abs(tmpArrival - tmpDeparture) / (60 * 1000)
                    );
                    obj.departureTime = new Date(obj.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    obj.arrivalTime = new Date(obj.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    obj.trainNumber = obj.trainNumber.replace('RER', '');
                });
            }

        }
    })
</script>
    
    <template>
      
    
      <div class="card" v-if="transports.length > 0">
        <h2>RER E 🚅</h2>
        <p>Villiers sur marne - direction haussman st lazare</p>
        <div class="trans-container">
            <div v-for="(item, index) in transports" v-bind:key="'trans'+index" class="trans-item">
                <div :id="'trans'+index" v-if="item.trainNumber" class="trans-content">
                    <span>{{item.trainNumber}} 👨‍✈️</span>
                    <span>{{item.departureTime}} 🕝</span>
                    <span>{{item.duration}} min ⏳</span>
                </div>    
            </div>
        </div>
      </div>
    </template>
    
    <style scoped>

    h2 {
        color: #DE81D3;
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
    
