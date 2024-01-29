<script lang="ts">
    import { defineComponent } from 'vue'

    type Crypto = {
            value : string;
        }

    export default defineComponent({
        data() {
            return {
                crypto: [] as Crypto[],
                api: this.$server_url + '/crypto'
            }
        },
        async created() {
            await this.getCrypto();
        },
        methods: {
            async getCrypto() {
                const response = await fetch(this.api);
                const data = await response.json();
                this.crypto = Array.from(data.crypto_info);
            }
        }
    })
</script>
    
    <template>
      
      <div class="card" v-if="crypto.length > 0">
        
        <h2>Cardano 🏦</h2>
        <div v-for="(item, index) in crypto" v-bind:key="'crypto'+index">
            <span :id="'crypto'+index"> {{item.value}} ₳</span>
        </div>
      </div>
    </template>
    
    <style scoped>
    .read-the-docs {
      color: #888;
    }
    </style>
    
