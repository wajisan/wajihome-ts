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
                const data = await response.json();
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
        <p>21h00 à 6h00 🌃</p>
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
    
