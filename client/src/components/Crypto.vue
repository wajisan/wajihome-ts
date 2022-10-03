<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        data() {
            return {
                crypto: [] as string[],
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
                this.crypto = data;
            }
        }
    })
</script>
    
    <template>
      
    
      <div class="card" v-if="crypto.length > 0">
        <h2>Cardano information</h2>
        <p>Stake address</p>
        <div v-for="(item, index) in crypto" v-bind:key="'crypto'+index">
            <span :id="'crypto'+index"> {{item}}</span>
            <hr/>
        </div>
      </div>
    </template>
    
    <style scoped>
    .read-the-docs {
      color: #888;
    }
    </style>
    
