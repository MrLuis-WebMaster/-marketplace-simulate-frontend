import { UserRole } from "../../../types/user.type"
import FormSignUp from "../components/FormSignUp"

const Customer = () => {
  return (
      <FormSignUp role={UserRole.CUSTOMER}/>
  )
}

export default Customer