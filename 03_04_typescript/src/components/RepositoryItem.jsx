export const RepositoryItem = ({ repository }) => {
  
  return (
    <li >
      <p>{repository.name}</p>
      <a href={repository.html_url}>{repository.name}</a>
    </li>
  )
};