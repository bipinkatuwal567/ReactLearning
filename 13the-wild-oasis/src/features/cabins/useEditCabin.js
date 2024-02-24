import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editMutate, isLoading: isEditing } = useMutation({
    mutationFn: ({ cabinData, id }) => {
      createEditCabin(cabinData, id);
    },
    onSuccess: () => {
      toast.success("Successfully edited a cabin");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: () => {
      toast.error((error) => error.message);
    },
  });

  return { isEditing, editMutate };
}
