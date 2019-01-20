<template>
    <div  class="item" >
        <div v-if="item.sale && !isModal" class="sticker">sale</div>
            <div class="img" :style="{'backgroundImage' : 'url('+item.img+')'}"  v-on:click="chooseProduct"></div>
            <div class="title" v-text="item.name"></div>
            <div class="text" v-if="isModal">
                {{item.text}}
            </div>
            <div class="prices">
                <div class="old" v-if="item.price.old" ><span class="money" v-text="item.price.old.toFixed(2)"></span></div>
                <div class="new" ><span class="money" v-text="item.price.new.toFixed(2)"></span></div>
            </div>
            <div class="bottom-block">
                <div class="count">
                <button v-on:click="change(1)">+</button>
                <input type="number" v-model="nrItems">
                <button v-on:click="change(-1)">-</button>
                </div>
                <button class="toCard" v-if="!item.inBasket" v-on:click="addToCard">+ Add To Card</button>
                <button class="toCard del" v-if="item.inBasket" v-on:click="removeFromCard">- Remove item</button>
            </div>
    </div>
</template>
<script>
export default {
  data(){
      return{
          nrItems:1,
        //   inBasket:false
      }
  },
  methods:{
      change(num){
          if(this.nrItems + num < 99 && (this.nrItems + num ) >= 0){
                this.nrItems += num;
          }
      },
      addToCard(){
          let itms = parseInt(this.nrItems);
            if(itms > 0 && !this.item.inBasket  && itms < 99 ){
                 let itm = {}
              itm.id = this.item.id;
              itm.quant = itms;
              this.$emit('changed',itm);
              let itmsText= itm.quant > 1 ? 'items': 'item';
              alert('added to cart  '+itm.quant+' '+itmsText);
            }else{
                alert("You have 0 items or  items number is greater  than  99 /  lower   than  0");
            }
      },
      removeFromCard(){
          this.nrItems=1;
          if(this.isModal) {
              this.$emit('remove-from-modal',this.item.id);

          } else {
              this.$emit('remove',this.item.id);
          }
      },

      chooseProduct(){
          this.$emit('chose_item', this.item.id);
      }
     
  },
  props:['item', 'isModal']
}
</script>

