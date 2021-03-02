// janelle wants cow pies at the bottom
app.component('tip-selector', {
    template: /*html*/ `
    <div id="tip-selector">
        Select the tip:<br>
        <button class=tipButton @click='tip = 10'>10%</button>
        <button class=tipButton @click='tip = 15'>15%</button>
        <button class=tipButton @click='tip = 20'>20%</button>
        <button class=customTipButton @click='toggleCustom'>Custom</button>
        <br>
        <div v-if="showCustom">
            <input v-model="tip" size="5"/>%
        </div>
    </div>
    `,
    data() {
        return {
            tip: 0,
            showCustom: false
        }
    },
    methods: {
        toggleCustom: function() {
            this.showCustom = ~this.showCustom;
        }
    },
    watch: {
        // tell other components (including parent) that the value changed
        tip: function () {
            console.log('telling the world that the tip changed to ' + this.tip);
            this.$emit('tip-changed', this.tip);
        }
    }
})
