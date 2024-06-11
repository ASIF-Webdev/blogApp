import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: 'login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/',
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Posts',
      slug: '/add-posts',
      active: authStatus
    },
  ]

  return (
    <header>
      <Container>
        <nav>
          <div>
            <Link to='/'>
              <Logo width='70'/>            
            </Link>
          </div>

          <ul>
            {navItems.map((item) => (
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            ))}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header