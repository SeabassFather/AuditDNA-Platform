<div className="category-card">
  <div
    className="category-header"
    onClick={() => setExpandedCategory(expandedCategory === idx ? null : idx)}
  >
    <div className="header-left">
      <span className="cat-icon">{cat.icon}</span>
      <div>
        <div className="cat-title">{cat.category}</div>
        <div className="cat-count">{cat.items?.length || 0} services</div>
      </div>
    </div>
    <span className="cat-arrow">{expandedCategory === idx ? 'â–²' : 'â–¼'}</span>
    <span className="cat-arrow">{expandedCategory === idx ? 'ÃƒÂ¢Ã¢â‚¬â€œÃ‚Â²' : 'ÃƒÂ¢Ã¢â‚¬â€œÃ‚Â¼'}</span>
  </div>
  {expandedCategory === idx && (
    <div className="service-grid">
      {cat.items.map((svc, i) => (
        <div key={i} className="service-item">{svc}</div>
      ))}
    </div>
  )}
</div>
