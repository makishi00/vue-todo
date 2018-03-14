(function() {
    'use strict';
    const v = new Vue({
        el: '#app',
        data: {
            newItem:'',
            todos: []
        },
        watch: {
            todos: {
                handler: function () {
                    localStorage.setItem('todos', JSON.stringify(this.todos));
                },
                deep: true
            }
        },
        mounted: function() {
            this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        },
        methods: {
            addItem: function() {
                if (this.newItem === "") {
                    alert('入力してください。');
                    return;
                }

                const item = {
                    title: this.newItem,
                    createAt: this.nowDate,
                    isDone: false
                };
                this.todos.push(item);
                this.newItem = "";
            },
            deleteItem: function(index) {
                if (confirm("指定したタスクを削除しますか？")) {
                    this.todos.splice(index, 1);
                }
            },
            purge: function () {
                if (!confirm("実行済みのタスクを全て削除しますか?")) return;
                this.todos = this.remaining;
            }
        },
        computed: {
            remaining: function() {
                return this.todos.filter(todo => !todo.isDone);
            },
            nowDate: function() {
                const d = new Date;
                const dayOfTheWeeks = ["日","月","火","水","木","金","土"];
                const year = d.getFullYear();
                const month = d.getMonth() + 1;
                const week = d.getDay();
                const day = d.getDate();
                const hour = d.getHours();
                const minute = d.getMinutes();
                const date = year + "/" + month + "/" + day + "/ " + "(" + dayOfTheWeeks[week] + ")";
                const time = hour + ":" + minute;
                return date + " " + time;
            }
        }
    });
})();