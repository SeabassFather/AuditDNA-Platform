// ================================================================
// MY LISTINGS TAB - AG MARKETPLACE
// ================================================================
// Date: 2025-11-12 08:38:07 UTC
// User: SeabassFather
// Status: PRODUCTION READY
// ================================================================

import React, { useState } from 'react';
import { Package, Plus, Edit, Trash2, Eye, EyeOff, X } from 'lucide-react';

export default function MyListingsTab() {
  const [showModal, setShowModal] = useState(false);
  const [listings, setListings] = useState([
    {
      id: 1,
      product: 'Avocado (Hass)',
      quantity: '1,000 boxes',
      price: '$2.15/lb',
      origin: 'Michoacán, Mexico',
      available: 'Oct 20, 2025',
      quality: 'Grade A',
      certifications: ['GlobalGAP', 'USDA Organic'],
      status: 'active',
      views: 245,
      inquiries: 12
    },
    {
      id: 2,
      product: 'Bell Pepper (Red)',
      quantity: '500 boxes',
      price: '$1.65/lb',
      origin: 'Sinaloa, Mexico',
      available: 'Oct 18, 2025',
      quality: 'Grade A',
      certifications: ['PRIMUS', 'Fair Trade'],
      status: 'active',
      views: 189,
      inquiries: 8
    },
    {
      id: 3,
      product: 'Tomato (Roma)',
      quantity: '750 boxes',
      price: '$1.18/lb',
      origin: 'Baja California, Mexico',
      available: 'Oct 22, 2025',
      quality: 'Grade B',
      certifications: ['GlobalGAP'],
      status: 'inactive',
      views: 67,
      inquiries: 3
    }
  ]);

  const [newListing, setNewListing] = useState({
    product: '',
    quantity: '',
    price: '',
    origin: '',
    available: '',
    quality: 'Grade A',
    certifications: []
  });

  const handleCreateListing = () => {
    const listing = {
      id: listings.length + 1,
      ...newListing,
      status: 'active',
      views: 0,
      inquiries: 0
    };
    setListings([...listings, listing]);
    setShowModal(false);
    setNewListing({
      product: '',
      quantity: '',
      price: '',
      origin: '',
      available: '',
      quality: 'Grade A',
      certifications: []
    });
  };

  const toggleStatus = (id) => {
    setListings(listings.map(l => 
      l.id === id ? { ...l, status: l.status === 'active' ? 'inactive' : 'active' } : l
    ));
  };

  const deleteListing = (id) => {
    setListings(listings.filter(l => l.id !== id));
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
            My Listings
          </h2>
          <p style={{ fontSize: '1rem', color: '#94a3b8' }}>Manage your product listings on the marketplace</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Plus size={20} />
          New Listing
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(100, 116, 139, 0.3)', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e' }}>{listings.filter(l => l.status === 'active').length}</div>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Active Listings</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(100, 116, 139, 0.3)', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>{listings.reduce((sum, l) => sum + l.views, 0)}</div>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Total Views</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(100, 116, 139, 0.3)', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>{listings.reduce((sum, l) => sum + l.inquiries, 0)}</div>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Total Inquiries</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '2px solid rgba(100, 116, 139, 0.3)', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>{listings.length}</div>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Total Listings</div>
        </div>
      </div>

      {/* Listings Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {listings.map(listing => (
          <div key={listing.id} style={{
            background: 'rgba(30, 41, 59, 0.6)',
            border: '2px solid rgba(100, 116, 139, 0.3)',
            borderRadius: '16px',
            overflow: 'hidden'
          }}>
            
            {/* Listing Header */}
            <div style={{
              padding: '1.5rem',
              background: listing.status === 'active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(100, 116, 139, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Package style={{ color: listing.status === 'active' ? '#22c55e' : '#64748b' }} size={24} />
                  <h3 style={{ fontWeight: 'bold', color: '#fff' }}>{listing.product}</h3>
                </div>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  background: listing.status === 'active' ? '#22c55e' : '#64748b',
                  color: '#fff'
                }}>
                  {listing.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Listing Details */}
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>QUANTITY</div>
                  <div style={{ fontWeight: 'bold', color: '#fff' }}>{listing.quantity}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>PRICE</div>
                  <div style={{ fontWeight: 'bold', color: '#22c55e' }}>{listing.price}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>ORIGIN</div>
                  <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.85rem' }}>{listing.origin}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>AVAILABLE</div>
                  <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.85rem' }}>{listing.available}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>QUALITY</div>
                  <div style={{ fontWeight: 'bold', color: '#fff' }}>{listing.quality}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>VIEWS / INQUIRIES</div>
                  <div style={{ fontWeight: 'bold', color: '#fff' }}>{listing.views} / {listing.inquiries}</div>
                </div>
              </div>

              {/* Certifications */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>CERTIFICATIONS</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {listing.certifications.map((cert, idx) => (
                    <span key={idx} style={{
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(59, 130, 246, 0.2)',
                      border: '1px solid #3b82f6',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      color: '#3b82f6',
                      fontWeight: 'bold'
                    }}>
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => toggleStatus(listing.id)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: listing.status === 'active' 
                      ? 'rgba(100, 116, 139, 0.6)' 
                      : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {listing.status === 'active' ? <EyeOff size={16} /> : <Eye size={16} />}
                  {listing.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
                <button style={{
                  padding: '0.75rem',
                  background: 'transparent',
                  border: '2px solid #3b82f6',
                  borderRadius: '10px',
                  color: '#3b82f6',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => deleteListing(listing.id)}
                  style={{
                    padding: '0.75rem',
                    background: 'transparent',
                    border: '2px solid #ef4444',
                    borderRadius: '10px',
                    color: '#ef4444',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Create Listing Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: '16px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: '2px solid rgba(34, 197, 94, 0.3)'
          }}>
            
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              padding: '2rem',
              position: 'sticky',
              top: 0,
              zIndex: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#fff' }}>Create New Listing</h3>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.5rem',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '2rem' }}>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.5rem' }}>
                  Product *
                </label>
                <input
                  type="text"
                  value={newListing.product}
                  onChange={(e) => setNewListing({...newListing, product: e.target.value})}
                  placeholder="e.g., Avocado (Hass)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: '2px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    Quantity *
                  </label>
                  <input
                    type="text"
                    value={newListing.quantity}
                    onChange={(e) => setNewListing({...newListing, quantity: e.target.value})}
                    placeholder="e.g., 1,000 boxes"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '2px solid rgba(100, 116, 139, 0.3)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    Price *
                  </label>
                  <input
                    type="text"
                    value={newListing.price}
                    onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                    placeholder="e.g., $2.15/lb"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '2px solid rgba(100, 116, 139, 0.3)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    Origin *
                  </label>
                  <input
                    type="text"
                    value={newListing.origin}
                    onChange={(e) => setNewListing({...newListing, origin: e.target.value})}
                    placeholder="e.g., Michoacán, Mexico"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '2px solid rgba(100, 116, 139, 0.3)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    Available Date *
                  </label>
                  <input
                    type="date"
                    value={newListing.available}
                    onChange={(e) => setNewListing({...newListing, available: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '2px solid rgba(100, 116, 139, 0.3)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.5rem' }}>
                  Quality Grade *
                </label>
                <select
                  value={newListing.quality}
                  onChange={(e) => setNewListing({...newListing, quality: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: '2px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                >
                  <option value="Grade A">Grade A</option>
                  <option value="Grade B">Grade B</option>
                  <option value="Premium">Premium</option>
                  <option value="Standard">Standard</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleCreateListing}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  Create Listing
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: '1rem 2rem',
                    background: 'transparent',
                    border: '2px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}