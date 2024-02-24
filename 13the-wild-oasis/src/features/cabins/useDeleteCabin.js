import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: mutateDelete } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Successfully delted a row");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return {isDeleting, mutateDelete}
}
