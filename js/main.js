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
            }
        }
    });
})();