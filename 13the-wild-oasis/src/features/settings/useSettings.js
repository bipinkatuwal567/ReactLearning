import React from "react";
import { getSettings } from "../../services/apiSettings";
import { useQuery } from "@tanstack/react-query";

export default function useSettings() {
  const {
    isLoading,
    error,
    data: setting,
  } = useQuery({
    queryFn: getSettings,
    queryKey: ["settings"],
  });

  return { isLoading, error, setting };
}
