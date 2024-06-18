<template>
    <div>
        <div>
            <span @click="$router.push({ name: 'signup' })"> Signup </span>
        </div>
        <form @submit.prevent="login">
            <label for="email">Email</label>
            <input type="email" id="email" required v-model="email" />

            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required />

            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    inject: ["directus"],
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        async login() {
            try {
                await this.directus.login(this.email, this.password);
                this.$router.push({ name: "home" });
            } catch ({ errors }) {
                console.log("🚀 ~ login ~ errors:", errors);
                if (errors[0].extensions.code === "INVALID_CREDENTIALS")
                    alert("Invalid Email or password");
                else
                    alert("Something went wrong. Try again after some time...");
            }
        },
    },
};
</script>
