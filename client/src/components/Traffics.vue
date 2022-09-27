<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        data() {
            return {
                traffics: [] as string[],
                api: 'http://localhost:3000/traffic'
            }
        },
        async created() {
            await this.getTraffics();
        },
        methods: {
            async getTraffics() {
                const response = await fetch(this.api);
                const data = await response.json();
                this.traffics = data;
            }
        }
    })
</script>
    
    <template>
      
    
      <div class="card" v-if="traffics.length > 0">
        <h2>Fermetures nocturnes</h2>
        <p>de 21h à 6h</p>
        <div v-for="(item, index) in traffics" v-bind:key="'traffic'+index">
            <span :id="'traffic'+index"> {{item}}</span>
            <hr/>
        </div>
      </div>
    </template>
    
    <style scoped>
    .read-the-docs {
      color: #888;
    }
    </style>
    