<template>
    <form @submit.prevent="login">
        <label for="email" style="display: block">Email</label>
        <input type="email" id="email" required v-model="email" />

        <label for="password" style="margin-top: 8px">Password</label>
        <input type="password" id="password" v-model="password" required />

        <button type="submit" style="display: block; margin-top: 16px">
            Login
        </button>
    </form>
</template>

<script>
export default {
    inject: ["directus"],
    data() {
        return {
            email: "jay.p.bharadia@gmail.com",
            password: "Dev@7$pan",
        };
    },
    created() {
        console.log("inside login vue page");
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

<style>
input,
label {
    display: block;
    width: 100%;
}
</style>
