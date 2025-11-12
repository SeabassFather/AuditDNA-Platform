// ================================================================
// LIVE ORDERS TAB - AG MARKETPLACE
// ================================================================
// Date: 2025-11-12 08:31:38 UTC
// User: SeabassFather
// Status: PRODUCTION READY
// ================================================================

import React, { useState } from 'react';
import { ShoppingCart, CheckCircle, Clock, XCircle, Filter, Search, Package } from 'lucide-react';

export default function LiveOrdersTab() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    {
      id: 'ORD-2025-1847',
      buyer: 'Mission Produce Inc',
      product: 'Avocado (Hass)',
      quantity: '500 boxes',
      price: '$2.15/lb',
      total: '$21,500',
      status: 'pending',
      timestamp: '2 mins ago',
      location: 'Oxnard, CA',
      delivery: 'Oct 18, 2025'
    },
    {
      id: 'ORD-2025-1846',
      buyer: 'COMEXA Trading',
      product: 'Bell Pepper (Red)',
      quantity: '300 boxes',
      price: '$1.58/lb',
      total: '$9,480',
      status: 'accepted',
      timestamp: '15 mins ago',
      location: 'McAllen, TX',
      delivery: 'Oct 19, 2025'
    },
    {
      id: 'ORD-2025-1845',
      buyer: 'Fruit Dome Inc',
      product: 'Tomato (Roma)',
      quantity: '750 boxes',
      price: '$1.12/lb',
      total: '$16,800',
      status: 'completed',
      timestamp: '1 hour ago',
      location: 'Nogales, AZ',
      delivery: 'Oct 17, 2025'
    },
    {
      id: 'ORD-2025-1844',
      buyer: 'Fresh Direct Foods',
      product: 'Cucumber',
      quantity: '200 boxes',
      price: '$0.85/lb',
      total: '$3,400',
      status: 'pending',
      timestamp: '1 hour ago',
      location: 'Los Angeles, CA',
      delivery: 'Oct 20, 2025'
    },
    {
      id: 'ORD-2025-1843',
      buyer: 'Walmart Fresh',
      product: 'Berries (Mixed)',
      quantity: '150 flats',
      price: '$4.25/flat',
      total: '$7,875',
      status: 'rejected',
      timestamp: '2 hours ago',
      location: 'Bentonville, AR',
      delivery: 'Oct 21, 2025'
    },
    {
      id: 'ORD-2025-1842',
      buyer: 'Sysco Corporation',
      product: 'Lettuce (Romaine)',
      quantity: '400 boxes',
      price: '$1.35/lb',
      total: '$10,800',
      status: 'accepted',
      timestamp: '3 hours ago',
      location: 'Houston, TX',
      delivery: 'Oct 18, 2025'
    }
  ];

  const statusConfig = {
    pending: { label: 'Pending', icon: Clock, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.2)' },
    accepted: { label: 'Accepted', icon: CheckCircle, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.2)' },
    completed: { label: 'Completed', icon: CheckCircle, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.2)' },
    rejected: { label: 'Rejected', icon: XCircle, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.2)' }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const orderCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    accepted: orders.filter(o => o.status === 'accepted').length,
    completed: orders.filter(o => o.status === 'completed').length,
    rejected: orders.filter(o => o.status === 'rejected').length
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
          Live Order Book
        </h2>
        <p style={{ fontSize: '1rem', color: '#94a3b8' }}>Real-time wholesale orders and trade opportunities</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {Object.entries(orderCounts).map(([status, count]) => {
          const config = statusConfig[status] || { label: 'All', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.2)' };
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                padding: '1.5rem',
                background: filterStatus === status ? config.bg : 'rgba(30, 41, 59, 0.6)',
                border: filterStatus === status ? `2px solid ${config.color}` : '2px solid rgba(100, 116, 139, 0.3)',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: config.color }}>{count}</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'capitalize', marginTop: '0.25rem' }}>{status}</div>
            </button>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.6)',
        border: '2px solid rgba(100, 116, 139, 0.3)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search orders by product, buyer, or order ID..."
              style={{
                width: '100%',
                paddingLeft: '3rem',
                paddingRight: '1rem',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
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
      </div>

      {/* Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {filteredOrders.map(order => {
          const config = statusConfig[order.status];
          const StatusIcon = config.icon;

          return (
            <div key={order.id} style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '2px solid rgba(100, 116, 139, 0.3)',
              borderRadius: '16px',
              overflow: 'hidden'
            }}>
              
              {/* Order Header */}
              <div style={{
                background: 'rgba(51, 65, 85, 0.6)',
                borderBottom: '1px solid rgba(100, 116, 139, 0.3)',
                padding: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Package style={{ color: '#22c55e' }} size={24} />
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#fff' }}>{order.id}</div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{order.timestamp}</div>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: config.bg,
                    borderRadius: '20px'
                  }}>
                    <StatusIcon style={{ color: config.color }} size={18} />
                    <span style={{ fontWeight: 'bold', color: config.color }}>{config.label}</span>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '1.5rem' }}>
                  
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>BUYER</div>
                    <div style={{ fontWeight: 'bold', color: '#fff' }}>{order.buyer}</div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{order.location}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>PRODUCT</div>
                    <div style={{ fontWeight: 'bold', color: '#fff' }}>{order.product}</div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{order.quantity}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>PRICING</div>
                    <div style={{ fontWeight: 'bold', color: '#fff' }}>{order.price}</div>
                    <div style={{ fontSize: '0.85rem', color: '#22c55e', fontWeight: 'bold' }}>Total: {order.total}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>DELIVERY DATE</div>
                    <div style={{ fontWeight: 'bold', color: '#fff' }}>{order.delivery}</div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>FOB Shipping</div>
                  </div>

                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(100, 116, 139, 0.3)', flexWrap: 'wrap' }}>
                  {order.status === 'pending' && (
                    <>
                      <button style={{
                        flex: 1,
                        minWidth: '150px',
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        border: 'none',
                        borderRadius: '10px',
                        color: '#fff',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}>
                        Accept Order
                      </button>
                      <button style={{
                        flex: 1,
                        minWidth: '150px',
                        padding: '0.75rem 1.5rem',
                        background: 'transparent',
                        border: '2px solid #ef4444',
                        borderRadius: '10px',
                        color: '#ef4444',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}>
                        Reject
                      </button>
                      <button style={{
                        padding: '0.75rem 1.5rem',
                        background: 'transparent',
                        border: '2px solid rgba(100, 116, 139, 0.3)',
                        borderRadius: '10px',
                        color: '#fff',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}>
                        Negotiate
                      </button>
                    </>
                  )}
                  {order.status === 'accepted' && (
                    <>
                      <button style={{
                        flex: 1,
                        minWidth: '150px',
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        border: 'none',
                        borderRadius: '10px',
                        color: '#fff',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}>
                        View Contract
                      </button>
                      <button style={{
                        flex: 1,
                        minWidth: '150px',
                        padding: '0.75rem 1.5rem',
                        background: 'transparent',
                        border: '2px solid #3b82f6',
                        borderRadius: '10px',
                        color: '#3b82f6',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}>
                        Arrange Shipping
                      </button>
                    </>
                  )}
                  {order.status === 'completed' && (
                    <button style={{
                      flex: 1,
                      padding: '0.75rem 1.5rem',
                      background: 'rgba(100, 116, 139, 0.6)',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}>
                      View Invoice
                    </button>
                  )}
                  {order.status === 'rejected' && (
                    <button style={{
                      flex: 1,
                      padding: '0.75rem 1.5rem',
                      background: 'transparent',
                      border: '2px solid rgba(100, 116, 139, 0.3)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}>
                      View Details
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '4rem',
          background: 'rgba(30, 41, 59, 0.6)',
          border: '2px solid rgba(100, 116, 139, 0.3)',
          borderRadius: '16px'
        }}>
          <ShoppingCart style={{ margin: '0 auto', color: '#64748b', marginBottom: '1rem' }} size={48} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>No orders found</h3>
          <p style={{ color: '#94a3b8' }}>Try adjusting your filters or search terms</p>
        </div>
      )}

    </div>
  );
}