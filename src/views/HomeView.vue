<template>
  <div class="align-items-center">
    <div class="page-holder bg-gray-100 vh-100">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12 px-lg-4">
            <div class="col-lg-10 px-lg-4 col-center">
              <div class="card">
                <div class="card-body p-lg-5">
                  <h3 class="mb-4">Books List</h3>
                  <button
                    class="btn btn-success btn-sm float-end"
                    @click="addBook"
                  >
                    Add Book
                  </button>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Sub Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in list" :key="index">
                        <td>{{ row.title }}</td>
                        <td>{{ row.sub_title }}</td>
                        <td>{{ row.author }}</td>
                        <td>{{ row.price }}</td>
                        <td>
                          <button
                            class="btn btn-danger btn-sm me-2"
                            @click="deleteBook(row.id)"
                          >
                            Delete
                          </button>
                          <button
                            class="btn btn-warning btn-sm"
                            @click="updateBook(row.id)"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
import "bootstrap/dist/css/bootstrap.min.css";
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const axios = inject("axios"); // inject axios
    const list = ref([]);
    let token = localStorage.getItem("_session");

    const addBook = () => {
      router.push("/book/add");
    };

    const updateBook = (id) => {
      router.push(`/book/${id}`);
    };

    const getList = () => {
      axios
        .get("book", {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        })
        .then((response) => {
          list.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const deleteBook = (id) => {
      axios
        .delete(`book/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            getList();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    onMounted(() => {
      getList();
    });
    return {
      axios,
      list,
      getList,
      deleteBook,
      addBook,
      updateBook,
    };
  },
};
</script>
