<template>
  <div class="align-items-center">
    <div class="page-holder bg-gray-100 vh-100">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12 px-lg-4">
            <div class="col-lg-6 px-lg-4 col-center">
              <div class="card">
                <div class="card-body p-lg-5">
                  <div class="alert alert-primary" role="alert" v-if="isSaved">
                    Successfully saved!
                  </div>
                  <h3 class="mb-4">Update Book</h3>
                  <form id="loginForm" action="index.html">
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        id="floatingInput"
                        type="text"
                        placeholder="Title"
                        v-model="title"
                        required
                      />
                      <label for="floatingInput">Title</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        id="floatingInput"
                        type="text"
                        placeholder="Sub Title"
                        v-model="sub_title"
                        required
                      />
                      <label for="floatingInput">Sub Title</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        id="floatingInput"
                        type="text"
                        placeholder="Sub Title"
                        v-model="author"
                        required
                      />
                      <label for="floatingInput">Author</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        id="floatingInput"
                        type="text"
                        placeholder="Sub Title"
                        v-model="price"
                        required
                      />
                      <label for="floatingInput">Price</label>
                    </div>
                    <div class="form-group">
                      <button
                        class="btn btn-primary"
                        id="regidter"
                        type="button"
                        name="registerSubmit"
                        @click="save"
                      >
                        Save
                      </button>
                      <router-link
                        :to="`/books`"
                        class="text-decoration-none ms-3"
                        >Go to books list</router-link
                      >
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const axios = inject("axios"); // inject axios
    const title = ref(null);
    const sub_title = ref(null);
    const author = ref(null);
    const price = ref(null);
    const isSaved = ref(false);
    let token = localStorage.getItem("_session");

    const save = async () => {
      const form = {
        title: title.value,
        sub_title: sub_title.value,
        author: author.value,
        price: price.value,
        _method: "PATCH",
      };
      axios
        .request({
          url: `book/${router.currentRoute._value.params.id}`,
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
          data: form,
        })
        .then((response) => {
          if (response.status === 200) {
            isSaved.value = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    onMounted(() => {
      axios
        .get(`/book/get-specific/${router.currentRoute._value.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        })
        .then((response) => {
          title.value = response.data.title;
          sub_title.value = response.data.sub_title;
          author.value = response.data.author;
          price.value = response.data.price;
        })
        .catch((error) => {
          console.log(error);
        });
    });
    return {
      title,
      sub_title,
      author,
      price,
      isSaved,
      save,
    };
  },
};
</script>
