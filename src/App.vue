<template>
    <div id="app">
        <div v-if="hasWeb3">
            <h1>Голосование за президента</h1>
            <ul>
                <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
                <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
                <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
                <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
            </ul>
            <h2>Ecosystem</h2>
            <ul>
                <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
                <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
                <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
                <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
            </ul>
             <div id="people">
                <v-client-table :data="tableData" :columns="columns" :options="{filterable:false}"></v-client-table>
            </div>
        </div>
        <div v-else>
            <h1>Установите Metamask для участия в голосовании</h1>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'app',
        mounted() {

            // Check if Web3 has been injected by the browser:
            if (typeof web3 !== 'undefined') {
                // You have a web3 browser! Continue below!
                this.hasWeb3 = true;
            } else {
                // Warn the user that they need to get a web3 browser
                // Or install MetaMask, maybe with a nice graphic.
                this.hasWeb3 = false;
            }

        },
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                columns: ['name', 'count'],
                tableData: [
                    {name: "John", count: "20"},
                ],
                proposals: [],
                hasWeb3: false,
            }
        },
        computed: {},
        methods: {
            sayHello: function () {
                console.log('hello, World!');
            }
        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
