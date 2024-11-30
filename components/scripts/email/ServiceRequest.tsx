interface props {
  name: string,
  email: string, 
  phone: string,
  tags: string,
  message: string,
}

export const ServiceRequest: React.FC<Readonly<props>> = ({
  name,email, phone,tags,message
}) => {
  const tagsArray = tags.split("|,")
  return (
  <div>
    <h1>Someone new is tring to contact you from Whimsy Decor!</h1>
    <ul>
      <li>Name: {name}</li>
      <li>email: {email}</li>
      <li>Phone: {phone}</li>
      <li>
        <h4>Tags:</h4>
        <ul>
          {tagsArray.map((tag, index) => (<li key={index}>{tag}</li>))}
        </ul>
        <br />
      </li>
      <li>Message: {message}</li>
    </ul>
  </div>
)};