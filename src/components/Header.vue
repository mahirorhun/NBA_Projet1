<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link to="/" active-class="active"  exact class="navbar-brand">Home</router-link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item dropdown-item">
              <router-link 
              to="/teams" 
              active-class="active" 
              class="nav-link" 
              exact
              tag="li">Teams</router-link>
            </li>
            <li class="nav-item">
              <router-link 
              to="/standings" 
              active-class="active" 
              class="nav-link" 
              exact
              tag="li">Standings</router-link>
            </li>
            <li class="nav-item">
              <router-link 
              to="/games" 
              active-class="active" 
              class="nav-link" 
              exact
              tag="li">Games</router-link>
            </li>
            <li class="nav-item">
              <router-link 
              to="/Players" 
              active-class="active" 
              class="nav-link" 
              exact
              tag="li">Players</router-link>
            </li>
            <li class="nav-item">
              <router-link 
              to="/statistics" 
              active-class="active" 
              class="nav-link" 
              exact
              tag="li">Statistics</router-link>
            </li>
            <li class="nav-item">
              <router-link 
              to="/seasons" 
              active-class="active" 
              class="nav-link" 
              exact
              tag="li">Seasons</router-link>
            </li>
            <!-- Diğer sayfa bağlantıları buraya eklenebilir -->
          </ul>
          <!-- <form class="d-flex ms-5">
          <input class="form-control me-2" type="search" placeholder="Ara" aria-label="Search">
          <button class="btn btn-outline-primary" type="submit">Ara</button>
        </form> -->
        </div>
      </div>
    </nav>
             
  </template>