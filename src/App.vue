<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app">
        <div v-if="hasWeb3">
            <h1>Голосование за президента</h1>
            <div id="people">
                <v-client-table :data="proposals" :columns="columns" :options="{filterable:false}"></v-client-table>
            </div>
            <h2 v-if="voted">Вы уже голосовали</h2>
            <div v-else>
                <h2>Проголосовать</h2>
                <button v-on:click="voteDenis">denis</button>
                <button v-on:click="voteValera">valera</button>
                <button v-on:click="voteOleg">oleg</button>
            </div>
        </div>
        <div v-else>
            <h1>Установите Metamask для участия в голосовании</h1>
            <a href="https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn" class="cta small" target="_blank">Metamask</a>
        </div>

    </div>
</template>

<script>
    function hex2a(hexx) {
        let hex = hexx.toString();
        let str = '';
        for (let i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str.replace(/\u0000/g,'');
    }

    function convertToHex(str) {
        let hex, i;

        let result = "";
        for (i=0; i<str.length; i++) {
            hex = str.charCodeAt(i).toString(16);
            result += ("000"+hex).slice(-4);
        }

        return result
    }

    const ABI = [{"constant":false,"inputs":[{"name":"proposal","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"name","type":"bytes32"},{"name":"voteCount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"chairperson","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"}],"name":"delegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"winningProposal","outputs":[{"name":"winningProposal","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voters","outputs":[{"name":"weight","type":"uint256"},{"name":"voted","type":"bool"},{"name":"delegate","type":"address"},{"name":"vote","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"winnerName","outputs":[{"name":"winnerName","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"giveRightToVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"proposalNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
    const CONTRACT_ADDRESS = '0x7ea490ebb55a2e006e0bb1150414b48ecb971f31';
    export default {
        name: 'app',
        mounted() {

            // Check if Web3 has been injected by the browser:
            if (typeof web3 !== 'undefined') {
                // You have a web3 browser! Continue below!
                this.hasWeb3 = true;
                let contract = web3.eth.contract(ABI);
                window.contract_i = contract.at(CONTRACT_ADDRESS);
                let that = this;
                for (let i = 0; i < 3; i++) {
                    window.contract_i.proposals(i, function (_, proposal) {
                        that.proposals.push({
                            name:hex2a(proposal[0]),
                            count:proposal[1].c[0]
                        })
                    });
                }
                this.checkVoted();

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
                proposals: [],
                hasWeb3: false,
                contract: null,
                voted: false
            }
        },
        computed: {
        },
        methods: {
            sayHello: function () {
                console.log('hello, World!');
            },
            checkVoted: function (){
                let this_address = web3.eth.defaultAccount;
                let that = this;
                window.contract_i.voters(this_address, function (_, voter) {
                    that.voted = voter[1];
                });
            },
            voteDenis: function () {
                window.contract_i.giveRightToVote(function(error, result){
                    if (error)
                        console.error(error);
                });
                window.contract_i.vote(convertToHex("denis"), function(error, result){
                    if (error)
                        console.error(error);
                });
            },
            voteValera: function () {
                window.contract_i.giveRightToVote(function(error, result){
                    if (error)
                        console.error(error);
                });
                window.contract_i.vote(convertToHex("valera"), function(error, result){
                    if (error)
                        console.error(error);
                });
            },
            voteOleg: function () {
                window.contract_i.giveRightToVote(function(error, result){
                    if (error)
                        console.error(error);
                });
                window.contract_i.vote(convertToHex("oleg"), function(error, result){
                    if (error)
                        console.error(error);
                });
            },
        },
    }
</script>

<style>
    .VueTables__table{
        margin-left: 47%;
    }
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
