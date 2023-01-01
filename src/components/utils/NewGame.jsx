import FormLayout from "./FormLayout";
import Input from "./Input";

const NewGame = () => {
  return (
    <FormLayout>
      <h3>New {of}</h3>
      <Input
        label="email"
        invalid={invalid ? invalid : null}
        attrs={{
          type: 'email',
          placeholder: 'email',
          name: 'email',
          value: email,
          onChange: handleChange,
        }}
      />

      <Input
        label={null}
        attrs={{
          type: 'submit',
          name: 'submit',
          value: 'submit',
          onClick: handleSubmit
        }}
      />
    </FormLayout>
  );
}

export default NewGame;