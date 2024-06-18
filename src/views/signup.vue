<template>
    <div>
        <form @submit.prevent="signup">
            <label>Name</label>
            <input type="text" v-model="name" required />

            <label>Email</label>
            <input type="email" v-model="email" required />

            <label>Password</label>
            <input type="password" v-model="password" required />
            <button type="submit">Signup</button>
            <p>
                Already have account?
                <span @click="$router.push({ name: 'login' })">Login</span>
            </p>
        </form>
    </div>
</template>

<script>
import { registerUser } from "@directus/sdk";
export default {
    inject: ["directus"],
    data() {
        return {
            name: "",
            email: "",
            password: "",
        };
    },
    methods: {
        async signup() {
            await this.directus.request(
                registerUser({
                    first_name: this.name,
                    email: this.email,
                    password: this.password,
                })
            );
            this.$router.push({ name: "login" });
        },
    },
};
</script>
