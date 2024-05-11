<template>
    <div>
        <form @submit.prevent="signup">
            <label>Name</label>
            <input type="text" v-model="name" required />

            <label>Email</label>
            <input type="email" v-model="email" required />

            <label>Password</label>
            <input type="password" v-model="password" required />
            <button type="submit" style="margin-top: 16px">Signup</button>
            <p>
                Already have account?
                <span
                    @click="$router.push({ name: 'login' })"
                    style="text-decoration: underline; cursor: pointer"
                    >Login</span
                >
            </p>
        </form>
    </div>
</template>

<script>
import { createUser } from "@directus/sdk";
export default {
    inject: ["directus"],
    data() {
        return {
            name: "jay",
            email: "jay1234@gmail.com",
            password: "1234567890",
        };
    },
    methods: {
        async signup() {
            const result = await this.directus.request(
                createUser({
                    first_name: this.name,
                    last_name: "",
                    email: this.email,
                    password: this.password,
                    role: "1c005600-202d-429c-81bb-452a70aec7e1", // Customer
                })
            );
            this.$router.push({ name: "login" });
            console.log("🚀 ~ result:", result);
        },
    },
};
</script>
