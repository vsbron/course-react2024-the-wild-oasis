import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

function CreateCabinForm({ cabinToEdit = {} }) {
  // Destructuring the cabin we need to edit
  const { id: editId, ...editValues } = cabinToEdit;

  // Getting a boolean of whether we updating the cabin or is it a new one
  const isEditSession = Boolean(editId);

  // Getting functions from useForm hook. Assigning default values if there's a row to update
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState; // Getting the errors from the form, if there's any

  // Getting the Query client by calling hook
  const queryClient = useQueryClient();

  // New cabin
  // Getting isLoading state and mutate function from useMutation hook
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin),
    onSuccess: () => {
      toast.success("New cabin successflly added");
      // Invalidating "cabin" query
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset(); // Resetting the form
    },
    onError: (err) => toast.error(err.message),
  });

  // Edit cabin
  // Getting isLoading state and mutate function from useMutation hook
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      // Invalidating "cabin" query
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset(); // Resetting the form
    },
    onError: (err) => toast.error(err.message),
  });

  // Submit handler function that automatically gets data object
  function onSubmit(data) {
    // Checking whether we have the image url or the image in the data
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin({ newCabinData: { ...data, image }, id: editId });
    else createCabin({ ...data, image: image });
  }

  // Error handler function (prits out the errors if there's at least one error)
  function onError(errors) {
    // console.log(errors);
  }

  // Boolean status of whether the app is loading something
  const isWorking = isCreating || isEditing;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "Please enter the cabin's name",
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "Please provide the capacity",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "Please provide the price",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "Please provide the discount",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          disabled={isWorking}
          {...register("description", {
            required: "Please enter a short description",
          })}
        />
      </FormRow>
      {/* Photo upload input, required only if we add a new cabin */}
      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "Please provide an image",
          })}
        />
      </FormRow>
      {/* type is an HTML attribute! */}
      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Update" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
