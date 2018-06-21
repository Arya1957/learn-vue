//  import Vue from 'vue';

let APP_ID = 'fubRKob5ombKpfC0jqcYo4d5-gzGzoHsz';
let APP_KEY = 'LL25S9QYDBzrNtUAqPwbpawD';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});


let todo = new Vue({
    el: '#layout',
    data: {
        action: 'signUp',
        formData: {
            username: '',
            password: ''
        },
        todo: '',
        todoList: [],
        currentUser: null
    },
    created: function () {
        this.currentUser = this.getCurrentUser();
        this.fetchTodos();

    },
    methods: {
        fetchTodos: function () {
            if (this.currentUser) {
                var query = new AV.Query('AllTodos');
                query.find().then((todos) => {
                    let avAllTodos = todos[0];
                    let id = avAllTodos.id;
                    this.todoList = JSON.parse(avAllTodos.attributes.content);
                    this.todoList.id = id;
                    console.log(this.todoList)


                }, function (error) {
                    console.log(error)
                })
            }

        },
        updateTodos: function () {
            let dataStr = JSON.stringify(this.todoList);
            let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id);
            avTodos.set('content', dataStr);
            avTodos.save().then(() => {
                console.log('更新成功')
            })

        },
        saveTodos: function () {
            let dataStr = JSON.stringify(this.todoList);
            var AVtodos = AV.Object.extend('AllTodos');
            var avTodos = new AVtodos();
            var acl = new AV.ACL();
            acl.setReadAccess(AV.User.current(), true);
            acl.setWriteAccess(AV.User.current(), true);
            avTodos.set('content', dataStr);
            avTodos.setACL(acl);
            avTodos.save().then((todo) => {
                this.todoList.id = todo.id;
                console.log('保存成功')
            }, function (error) {
                console.log('保存失败！')
            });


        },
        saveOrUpdateTodos: function () {
            console.log(this.todoList);

            this.todoList.id ? this.updateTodos() : this.saveTodos()
        },

        addTodo: function () {
            this.todoList.push({
                title: this.todo,
                done: false,
                date: new Date().toLocaleString()
            });
            this.todo = '';
            this.saveOrUpdateTodos()
        },
        removeTodo: function (todo) {
            let index = this.todoList.indexOf(todo);
            this.todoList.splice(index, 1);
            this.saveOrUpdateTodos()
        },

        signUp: function () {
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then((user) => {
                this.currentUser = this.getCurrentUser()
            }, (error) => {
                alert('注册失败')
            });
        },
        signIn: function () {
            AV.User.logIn(this.formData.username,
                this.formData.password).then(
                (user) => {
                    this.currentUser = this.getCurrentUser();
                    this.fetchTodos();
                }, (error) => {
                    alert('登录失败')
                })
        },
        getCurrentUser: function () {
            let current = AV.User.current();
            if (current) {
                let id = current.id;
                let username = current.attributes.username;
                let createdAt = current.createdAt;
                //可以简写为：
                //   let {id,createdAt,attributes:{username}} = current;

                // console.log({id, username, createdAt});
                return {id, username, createdAt}
            } else {
                return null
            }
        },
        logOut: function () {
            AV.User.logOut();
            this.currentUser = AV.User.current();
            window.location.reload()
        }
    }
});

