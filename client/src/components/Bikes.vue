<script lang="ts">
    import { defineComponent } from 'vue'

    type Bike = {
        mechanical: number,
        ebike: number
    }

    type BikeStation = {
            num_bikes_available_types: Bike[]
            num_docks_available : number;
            num_bikes_available : number;
        }

    export default defineComponent({

        props: {
            station_code: {
                type: String,
                required: true
            },
            station_name: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                bikes: [] as BikeStation[],
                api: this.$server_url + '/bike'
            }
        },
        async created() {
            await this.getBikes();
        },
        methods: {
            async getBikes() {
                const response = await fetch(this.api+'?station_codes='+this.station_code);
                const data = await response.json();
                console.log(data)
                this.bikes = Array.from(data.filtered_stations);
            }
        }
    })
</script>
    
    <template>
      
    
      <div class="card" v-if="bikes.length > 0">
        <h2>Bikes 🚲</h2>
        <p> {{station_name}}</p>
        <div v-for="(item, index) in bikes" v-bind:key="'bikes'+index">
            <span :id="'bikes'+index"  class="center-block">
                <span> 🟩 {{item.num_bikes_available_types[0].mechanical}} </span>
                <span> 🟦 {{item.num_bikes_available_types[1].ebike}} </span>
                <span> 🅿️ {{item.num_docks_available}} </span>
            </span>
        </div>
      </div>
    </template>
    
    <style scoped>
    .read-the-docs {
      color: #888;
    }

    .center-block {
        display: grid;
        text-align: start;
        width: fit-content;
        margin: auto;
    }

    </style>
    
