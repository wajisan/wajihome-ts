<script lang="ts">
    import { defineComponent } from 'vue'

    type Weather = {
        datetime : string;
        wind10m : number;
        probarain : number;
        temp2m : number;
    }
    export default defineComponent({
        data() {
            return {
                weather: [] as Weather[],
                api: this.$server_url + '/weather'
            }
        },
        async created() {
            await this.getWeather();
            this.setDateFormat();
        },
        methods: {
            async getWeather() {
                const response = await fetch(this.api);
                let data = await response.json();
                data = JSON.parse(data.weather_data.replace(/'/g, '"'));
                this.weather = data.forecast;
            },
            setDateFormat() {
                this.weather.map(obj => {
                    obj.datetime = new Date(obj.datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                });
            }
        }
    })
</script>
    
    <template>
      
    
      <div class="card" v-if="weather.length > 0">
        <h2>Meteo ⛅</h2>
        <p>Créteil</p>
        <div class="weather-container">
            <div v-for="(item, index) in weather" v-bind:key="'weather'+index" class="weather-item">
                <div :id="'weather'+index" class="weather-content"> 
                    <b>{{item.datetime}}</b>
                    <span>{{item.temp2m}}°C </span>
                    <span>{{item.wind10m}} km/h 💨</span>
                    <span>{{item.probarain}} % 💧</span>
                </div>
            </div>
        </div>
      </div>
    </template>
    
    <style scoped>
    .weather-content {
      display: grid;
    }
    .weather-item {
        margin: auto;
        padding: 10px;
    }
    .weather-item:nth-child(even) {
        background:#d6d6d6;
    }
    .weather-container {
        display: flex;
    }
    </style>
    
