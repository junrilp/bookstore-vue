<template>
  <div class="align-items-center">
    <div class="page-holder bg-gray-100 vh-100" v-if="!isLogin && userLogin">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12 px-lg-4">
            <div class="col-lg-6 px-lg-4 col-center" v-if="userLogin">
              <div class="card">
                <div class="card-body p-lg-5">
                  <h3 class="mb-4">Hi, welcome back!</h3>
                  <form id="loginForm" action="index.html">
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        id="floatingInput"
                        type="email"
                        placeholder="name@example.com"
                        v-model="login_email"
                        required
                      />
                      <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        id="floatingPassword"
                        type="password"
                        placeholder="Password"
                        v-model="login_password"
                        required
                      />
                      <label for="floatingPassword">Password</label>
                    </div>
                    <button
                      class="btn btn-primary"
                      type="button"
                      @click="login"
                    >
                      Submit
                    </button>
                  </form>
                </div>
                <div class="card-footer px-lg-5 py-lg-4">
                  <div class="text-sm text-muted">
                    Don't have an account?
                    <a @click="user_register()" class="register-button"
                      >Register</a
                    >.
                  </div>
                </div>
              </div>
            </div>
            <!-- register -->
            <div class="col-lg-6 px-lg-4 col-center" v-if="userRegister">
              <div class="card">
                <div class="card-body p-lg-5">
                  <div
                    class="alert alert-primary"
                    role="alert"
                    v-if="isRegistered"
                  >
                    You are successfully registered!
                  </div>
                  <h3 class="mb-4">Register your account</h3>
                  <form action="index.html">
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        id="username"
                        type="email"
                        placeholder="name@example.com"
                        v-model="register_name"
                        required
                      />
                      <label for="username">Name</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        id="floatingInput"
                        type="email"
                        placeholder="name@example.com"
                        v-model="register_email"
                        required
                      />
                      <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        id="floatingPassword"
                        type="password"
                        placeholder="Password"
                        v-model="register_password"
                        required
                      />
                      <label for="floatingPassword">Password</label>
                    </div>
                    <div class="form-group">
                      <button
                        class="btn btn-primary"
                        id="regidter"
                        type="button"
                        name="registerSubmit"
                        @click="register"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
                <div class="card-footer px-lg-5 py-lg-4">
                  <div class="text-sm text-muted">
                    Already have an account?
                    <a @click="user_login()" class="login-button">Login</a>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
//importing bootstrap 5 Modules
import "bootstrap/dist/css/bootstrap.min.css";
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const userLogin = ref(true);
    const userRegister = ref(false);
    const axios = inject("axios"); // inject axios

    const login_email = ref(null);
    const login_password = ref(null);

    const register_name = ref(null);
    const register_email = ref(null);
    const register_password = ref(null);

    const isRegistered = ref(false);
    const isLogin = ref(false);

    const user_login = () => {
      (userLogin.value = true), (userRegister.value = false);
    };

    const user_register = () => {
      (userLogin.value = false), (userRegister.value = true);
    };

    const login = () => {
      const form = {
        email: login_email.value,
        password: login_password.value,
      };

      axios
        .post("login", form)
        .then((response) => {
          let token = response.data.bearer_token;
          localStorage.setItem("_session", token);
          isLogin.value = true;
          router.push("/books");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const register = () => {
      const form = {
        name: register_name.value,
        email: register_email.value,
        password: register_password.value,
      };

      axios
        .post("register", form)
        .then((response) => {
          if (response.status) {
            isRegistered.value = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    onMounted(() => {
      if (localStorage.getItem("_session").length > 0) {
        isLogin.value = true;
      }
      // localStorage.setItem("_session", "");
    });
    return {
      userLogin,
      userRegister,
      user_login,
      user_register,
      axios,
      login_email,
      login_password,
      register_name,
      register_email,
      register_password,
      login,
      register,
      isRegistered,
      isLogin,
    };
  },
};
</script>
<style>
.register-button,
.login-button {
  margin-left: 10px;
  text-decoration: none;
  color: #6c757d !important;
}
.register-button,
.login-button:hover {
  cursor: pointer;
}

.col-center {
  display: block;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
