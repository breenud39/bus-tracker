import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";

const Signup = () => {
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      console.log(data);
    } catch (e) {
      console.error(e);
    }

    return (
      <main>
        <div>
          <div>
            <h4>Sign Up</h4>
            <div>
              <form onSubmit={handleFormSubmit}>
                <input
                  placeholder="Your username"
                  name="username"
                  type="username"
                  id="username"
                  value={formState.username}
                  onChange={handleChange}
                />
                <input
                  placeholder="Your email"
                  name="email"
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  placeholder="******"
                  name="password"
                  type="password"
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  };
};

export default Signup;
