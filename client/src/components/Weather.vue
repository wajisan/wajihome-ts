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
                const data = await response.json();
                console.log(data);
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
        <h2>Meteo</h2>
        <p>Villiers sur marne</p>
        <div v-for="(item, index) in weather" v-bind:key="'weather'+index">
            <div :id="'weather'+index" class="weather-item"> 
                <span> <b>heure</b> : {{item.datetime}}</span>
                <span> <b>vent moyen</b> : {{item.wind10m}} km/h</span>
                <span> <b>probabilité pluie</b> : {{item.probarain}} %</span>
                <span> <b>température</b> : {{item.temp2m}}°C </span>
            </div>
            <hr/>
        </div>
      </div>
    </template>
    
    <style scoped>
    .weather-item {
      display: grid;
    }
    </style>
    
