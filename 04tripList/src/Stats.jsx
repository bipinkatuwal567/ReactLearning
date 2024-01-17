export default function Stats({ items }) {
  if (!items.length) return <div className="stats">
    <em>Start adding some items to your packing list🚀</em>
  </div>;

  const itemsNum = items.length;
  const packedItemsNum = items.filter(item => item.packed).length;
  const packedPercentage = Math.round(packedItemsNum / itemsNum * 100);


  return (
    <footer className="stats">
      {packedPercentage === 100
        ?
        <em>"You're ready to go✈️"</em>
        :
        <em>`You have {itemsNum} items on your list, and you already packed {packedItemsNum} ({packedPercentage}%)`</em>}
    </footer>
  );
}
