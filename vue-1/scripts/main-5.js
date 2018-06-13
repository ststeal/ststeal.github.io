Vue.component('app-car', {
    data() {
        return {
            cars: [
                {model: "BMW", speed: 250},
                {model: "lada", speed: 100},
                {model: "audi", speed: 123},
                {model: "volge", speed: 300},
            ]
        };
    },
    template: '<div><div class="car" v-for="car in cars">\n' +
    '    <p>{{car.model}}</p>\n' +
    '</div></div>'
});

new Vue({
    el: '#app',
    components:{
        'app-car':{
            data() {
                return {
                    cars: [
                        {model: "BMW", speed: 250},
                        {model: "lada", speed: 100},
                        {model: "audi", speed: 123},
                        {model: "volge", speed: 300},
                    ]
                };
            },
            template: '<div><div class="car" v-for="car in cars">\n' +
            '    <p>{{car.model}}</p>\n' +
            '</div></div>'
        }
    }
});

new Vue({
    el: '#app2'
});
