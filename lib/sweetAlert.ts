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
  if (result.isConfirmed) {
    await Swal.fire({
      title: "Deleted!",
      text: "Your item has been deleted.",
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });
  }
  return result.isConfirmed;
};