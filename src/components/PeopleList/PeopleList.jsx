import People from '../People/People';
import peopleList from './PeopleList.module.css'
function PeopleList({ items, updateLike, tasks, onDelete }) {
  return (
    <ul className={peopleList.ulList}>
      {items.map(item => {
        return (
          <People
            key={item.id}
            {...item}
            updateLike={() => updateLike(item.id)}
            data={tasks}
            onDelete={onDelete}
          />
        );
      })}
    </ul>
  );
}
export default PeopleList;
