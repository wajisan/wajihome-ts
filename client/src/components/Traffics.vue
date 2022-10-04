<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        data() {
            return {
                traffics: [] as string[],
                api: this.$server_url + '/traffic'
            }
        },
        async created() {
            await this.getTraffics();
        },
        methods: {
            async getTraffics() {
                try {
                const response = await fetch(this.api);
                console.log('resp',response);
                const data = await response.json();
                console.log('data', data);
                this.traffics = data;
                }
                catch (err) {
                    console.error(err);
                }
            }
        }
    })
</script>
    
    <template>
      
    
      <div class="card" v-if="traffics.length > 0">
        <h2>Travaux 🚧 </h2>
        <p>de 21h à 6h 🌃</p>
        <div  class="traffic-container">
            <div v-for="(item, index) in traffics" v-bind:key="'traffic'+index" class="traffic-item">
                <span :id="'traffic'+index"> {{item}}</span>
            </div>
        </div>
      </div>
    </template>
    
    <style scoped>
    .read-the-docs {
      color: #888;
    }

    .traffic-item:nth-child(even) {
        background:#d6d6d6;
    }
    </style>
    
