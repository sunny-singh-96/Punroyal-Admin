import Swal from "sweetalert2";

export const confirmDelete = async (title = "Are you sure?") => {
  const result = await Swal.fire({
    title,
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });
  return result.isConfirmed;
};

export const showErrorAlert = async (title = "Action Not Allowed", message = "") => {
  return await Swal.fire({
    icon: "error",
    title,
    text: message,
    confirmButtonColor: "#d33",
    confirmButtonText: "OK",
  });
};

export const showSuccessAlert = async (title = "Success!", message = "") => {
  return await Swal.fire({
    icon: "success",
    title,
    text: message,
    timer: 1500,
    showConfirmButton: false,
  });
};
