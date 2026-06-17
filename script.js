document.addEventListener('DOMContentLoaded', function () {
  // ТЕМЫ (светлая/тёмная)
  var currentTheme = localStorage.getItem('theme') || 'light';
  
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    var themeButtons = document.querySelectorAll('.theme-button');
    themeButtons.forEach(function (btn) {
      if (btn.dataset.theme === theme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
  
  applyTheme(currentTheme);
  var themeButtons = document.querySelectorAll('.theme-button');
  themeButtons.forEach(function (btn) {
    btn.onclick = function () {
      applyTheme(btn.dataset.theme);
    };
  });

  // БУРГЕР-МЕНЮ
  var burger = document.querySelector('.header-burger');
  if (burger) {
    burger.onclick = function () {
      var nav = document.querySelector('.header-nav');
      var authLinks = document.querySelector('.header-auth');
      var themeSwitcher = document.querySelector('.theme-switcher');
      if (nav) nav.classList.toggle('open');
      if (authLinks) authLinks.classList.toggle('open');
      if (themeSwitcher) themeSwitcher.classList.toggle('open');
    };
  }

  // МОБИЛЬНЫЕ ФИЛЬТРЫ
  var filterButton = document.querySelector('.filter-toggle');
  var filtersPanel = document.querySelector('.filters');
  if (filterButton && filtersPanel) {
    filterButton.onclick = function () {
      filtersPanel.classList.toggle('open');
      if (filtersPanel.classList.contains('open')) {
        filterButton.textContent = '✕ Скрыть фильтры';
      } else {
        filterButton.textContent = '☰ Фильтры';
      }
    };

    document.addEventListener('click', function (event) {
      var isMobile = window.innerWidth <= 1024;
      var clickedOutside = !filtersPanel.contains(event.target) &&
        !filterButton.contains(event.target);
      var isOpen = filtersPanel.classList.contains('open');
      if (isMobile && clickedOutside && isOpen) {
        filtersPanel.classList.remove('open');
        filterButton.textContent = '☰ Фильтры';
      }
    });
  }

  // СЛАЙДЕР
  var slides = document.querySelectorAll('.slider-slide');
  var dots = document.querySelectorAll('.slider-dot');
  if (slides.length > 0 && dots.length > 0) {
    var currentSlide = 0;
    
    function showSlide(index) {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }
    
    dots.forEach(function (dot, index) {
      dot.onclick = function () {
        showSlide(index);
      };
    });
    
    var prevButton = document.querySelector('.slider-arrow-prev');
    var nextButton = document.querySelector('.slider-arrow-next');
    if (prevButton) {
      prevButton.onclick = function () {
        showSlide(currentSlide - 1);
      };
    }
    if (nextButton) {
      nextButton.onclick = function () {
        showSlide(currentSlide + 1);
      };
    }
  }

  // ДАННЫЕ ПРОЕКТОВ
  var projects = [
    { id: 1, title: 'VR-квартира мечты', author: 'Алексей К.', category: 'Unity', likes: 87, date: '2026-05-22', image: 'img/квартира.png', description: 'Интерактивный тур по квартире в VR' },
    { id: 2, title: '3D-модель дракона', author: 'София М.', category: 'Blender', likes: 64, date: '2026-05-17', image: 'img/дракон.jpg', description: 'Детализированная модель с анимацией' },
    { id: 3, title: 'AR-гид по музею', author: 'Денис Д.', category: 'Varwin', likes: 92, date: '2026-05-13', image: 'img/музей.png', description: 'Дополненная реальность для экскурсии' },
    { id: 4, title: 'Космический шутер', author: 'Егор П.', category: 'Unity', likes: 78, date: '2026-05-25', image: 'img/шутер.png', description: 'VR-игра в открытом космосе' },
    { id: 5, title: 'Интерьер кафе', author: 'Мария Л.', category: 'Blender', likes: 55, date: '2026-05-12', image: 'img/кафе.jpg', description: 'Визуализация дизайн-проекта' },
    { id: 6, title: 'Виртуальная лаборатория', author: 'Богдан В.', category: 'Varwin', likes: 71, date: '2026-05-16', image: 'img/лаборатория.jpg', description: 'Образовательный VR-класс по физике' },
    { id: 7, title: 'Средневековый замок', author: 'Анна Г.', category: 'Unity', likes: 95, date: '2026-05-11', image: 'img/замок.jpg', description: 'Историческая реконструкция в VR' },
    { id: 8, title: 'Робот-помощник', author: 'Артём В.', category: 'Blender', likes: 48, date: '2026-05-15', image: 'img/робот.jpg', description: '3D-модель' },
    { id: 9, title: 'AR-меню ресторана', author: 'Дмитрий Т.', category: 'Varwin', likes: 63, date: '2026-05-24', image: 'img/меню.jpg', description: 'Блюда в дополненной реальности' },
    { id: 10, title: 'Гонки на выживание', author: 'Виктория С.', category: 'Unity', likes: 82, date: '2026-05-14', image: 'img/гонки.jpg', description: 'Мультиплеерная VR-игра' },
    { id: 11, title: 'Анимационный ролик', author: 'Роман Ш.', category: 'Blender', likes: 59, date: '2026-05-18', image: 'img/анимация.png', description: '3D-анимация робота' },
    { id: 12, title: 'Тренажёр хирурга', author: 'Ксения У.', category: 'Varwin', likes: 88, date: '2026-05-20', image: 'img/тренажер.jpg', description: 'Обучающий VR-симулятор' },
    { id: 13, title: 'Подводный мир', author: 'Кирилл Г.', category: 'Unity', likes: 73, date: '2026-05-23', image: 'img/подводныймир.png', description: 'Исследование океана в VR' },
    { id: 14, title: 'Модель автомобиля', author: 'Емильян О.', category: 'Blender', likes: 67, date: '2026-05-21', image: 'img/спорткар.jpg', description: 'Детализированный спорткар' },
    { id: 15, title: 'AR-примерочная', author: 'Александра М.', category: 'Varwin', likes: 81, date: '2026-05-19', image: 'img/примерочная.jpg', description: 'Виртуальная примерка одежды' }
  ];

  // ЛАЙКИ И ИЗБРАННОЕ
  function getLikedProjects() {
    return JSON.parse(localStorage.getItem('liked') || '[]');
  }
  function getFavoritedProjects() {
    return JSON.parse(localStorage.getItem('favorited') || '[]');
  }
  function saveLikedProjects(list) {
    localStorage.setItem('liked', JSON.stringify(list));
  }
  function saveFavoritedProjects(list) {
    localStorage.setItem('favorited', JSON.stringify(list));
  }
  
  window.toggleAction = function (projectId, actionType) {
    var list;
    if (actionType === 'like') {
      list = getLikedProjects();
    } else {
      list = getFavoritedProjects();
    }
    var index = list.indexOf(projectId);
    if (index === -1) {
      list.push(projectId);
    } else {
      list.splice(index, 1);
    }
    if (actionType === 'like') {
      saveLikedProjects(list);
    } else {
      saveFavoritedProjects(list);
    }
    renderAllProjects();
    if (document.querySelector('.profile')) {
      renderProfileTable();
    }
  };

  // ФИЛЬТРАЦИЯ И СОРТИРОВКА
  var currentFilter = 'all';
  var currentSort = 'default';
  
  function getSortedProjects() {
    var sortedList = projects.slice();
    if (currentSort === 'date') {
      sortedList.sort(function (a, b) {
        return b.date.localeCompare(a.date);
      });
    } else if (currentSort === 'likes') {
      sortedList.sort(function (a, b) {
        return b.likes - a.likes;
      });
    }
    return sortedList;
  }
  
  function applyFilter(projectList) {
    if (currentFilter === 'all') {
      return projectList;
    }
    return projectList.filter(function (project) {
      return project.category.toLowerCase() === currentFilter;
    });
  }

  // ОТРИСОВКА КАРТОЧЕК
  function createProjectCard(project) {
    var likedList = getLikedProjects();
    var favoritedList = getFavoritedProjects();
    var isLiked = likedList.includes(project.id);
    var isFavorited = favoritedList.includes(project.id);
    var likesCount = isLiked ? project.likes + 1 : project.likes;
    var likeButtonClass = isLiked ? 'action-button liked' : 'action-button';
    var favButtonClass = isFavorited ? 'action-button favorited' : 'action-button';
    
    var cardHTML = `
    <div class="card">
      <div class="card-image">
        <img src="${project.image}" alt="${project.title}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 225%22><rect fill=%22%23e2e8f0%22 width=%22400%22 height=%22225%22/><text fill=%22%2394a3b8%22 x=%2250%%22 y=%2250%%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22>Изображение</text></svg>'">
      </div>
      <div class="card-content">
        <div class="card-title">${project.title}</div>
        <div class="card-description">${project.description}</div>
        <div class="card-info">👤 ${project.author} ❤️ ${likesCount}</div>
        <div class="card-tags">
          <span class="card-tag">${project.category}</span>
        </div>
        <div class="card-buttons">
          <button class="${likeButtonClass}" onclick="toggleAction(${project.id},'like')" title="Лайк">♥</button>
          <button class="${favButtonClass}" onclick="toggleAction(${project.id},'fav')" title="Избранное">★</button>
        </div>
      </div>
    </div>
    `;
    return cardHTML;
  }
  
  function renderAllProjects() {
    var sortedProjects = getSortedProjects();
    var filteredProjects = applyFilter(sortedProjects);
    
    var catalogGrid = document.getElementById('catalog-grid');
    if (catalogGrid) {
      catalogGrid.innerHTML = '';
      filteredProjects.forEach(function (project) {
        catalogGrid.innerHTML += createProjectCard(project);
      });
    }
    
    var featuredGrid = document.getElementById('featured-grid');
    if (featuredGrid) {
      featuredGrid.innerHTML = '';
      var limitedProjects = filteredProjects.slice(0, 4);
      limitedProjects.forEach(function (project) {
        featuredGrid.innerHTML += createProjectCard(project);
      });
    }
  }

  // ФИЛЬТРЫ И СОРТИРОВКА
  var filterInputs = document.querySelectorAll('.filter-option input');
  filterInputs.forEach(function (input) {
    input.onchange = function () {
      currentFilter = input.value;
      renderAllProjects();
    };
  });
  
  var sortSelect = document.querySelector('.catalog-sort');
  if (sortSelect) {
    sortSelect.onchange = function () {
      currentSort = sortSelect.value;
      renderAllProjects();
    };
  }
  
  renderAllProjects();

  // ВАЛИДАЦИЯ ФОРМ
  function validateField(field) {
    var isValid = true;
    var errorMessage = field.nextElementSibling;
    if (!errorMessage || !errorMessage.classList.contains('error-text')) {
      return true;
    }
    if (field.type === 'email') {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailPattern.test(field.value);
    } else if (field.type === 'password') {
      isValid = field.value.length >= 8 && /\d/.test(field.value);
    } else if (field.id === 'confirm-password') {
      var passwordField = document.getElementById('reg-password');
      isValid = field.value === passwordField.value;
    } else if (field.type === 'checkbox') {
      isValid = field.checked;
    } else {
      isValid = field.value.trim().length > 0;
    }
    if (!isValid) {
      field.classList.add('field-error');
      errorMessage.classList.add('show');
    } else {
      field.classList.remove('field-error');
      errorMessage.classList.remove('show');
    }
    return isValid;
  }
  
  function validateForm(form) {
    var allFieldsValid = true;
    var fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(function (field) {
      var fieldValid = validateField(field);
      if (!fieldValid) {
        allFieldsValid = false;
      }
    });
    return allFieldsValid;
  }

  // ОТПРАВКА ФОРМ
  var allForms = document.querySelectorAll('form');
  allForms.forEach(function (form) {
    form.onsubmit = function (event) {
      event.preventDefault();
      if (validateForm(form)) {
        var emailField = form.querySelector('input[type="email"]');
        var nameField = form.querySelector('input[type="text"]');
        if (emailField) {
          var userData = {
            email: emailField.value,
            name: nameField ? nameField.value : ''
          };
          localStorage.setItem('currentUser', JSON.stringify(userData));
        }
        window.location.href = 'index.html';
      }
    };
    var inputs = form.querySelectorAll('input');
    inputs.forEach(function (input) {
      input.oninput = function () {
        validateForm(form);
      };
    });
  });

  // ТАБЛИЦА В ПРОФИЛЕ
  function renderProfileTable() {
    var tableBody = document.getElementById('profile-table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    var likedIds = getLikedProjects();
    var favoritedIds = getFavoritedProjects();
    var allIds = likedIds.concat(favoritedIds);
    var uniqueIds = [];
    allIds.forEach(function (id) {
      if (uniqueIds.indexOf(id) === -1) {
        uniqueIds.push(id);
      }
    });
    if (uniqueIds.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:20px">Нет лайкнутых или избранных проектов</td></tr>';
      return;
    }
    uniqueIds.forEach(function (projectId) {
      var project = projects.find(function (p) {
        return p.id === projectId;
      });
      if (!project) return;
      var isLiked = likedIds.includes(projectId);
      var isFavorited = favoritedIds.includes(projectId);
      var statusIcons = '';
      if (isLiked) statusIcons += '❤️ ';
      if (isFavorited) statusIcons += '★';
      var rowHTML = `
        <tr class="profile-table-row" data-date="${project.date}" data-name="${project.title}">
          <td>${project.title}</td>
          <td>${project.author}</td>
          <td>${statusIcons}</td>
          <td>${project.date}</td>
        </tr>
      `;
      tableBody.innerHTML += rowHTML;
    });
  }
  
  var sortButtons = document.querySelectorAll('.sort-button');
  sortButtons.forEach(function (button) {
    button.onclick = function () {
      sortButtons.forEach(function (btn) {
        btn.classList.remove('active');
      });
      button.classList.add('active');
      var tableBody = document.getElementById('profile-table-body');
      if (!tableBody) return;
      var rows = Array.from(tableBody.querySelectorAll('.profile-table-row'));
      var sortType = button.dataset.sort;
      rows.sort(function (rowA, rowB) {
        if (sortType === 'date-asc') {
          return rowA.dataset.date.localeCompare(rowB.dataset.date);
        }
        if (sortType === 'date-desc') {
          return rowB.dataset.date.localeCompare(rowA.dataset.date);
        }
        if (sortType === 'name') {
          return rowA.dataset.name.localeCompare(rowB.dataset.name, 'ru');
        }
        return 0;
      });
      rows.forEach(function (row) {
        tableBody.appendChild(row);
      });
    };
  });
  
  if (document.querySelector('.profile')) {
    renderProfileTable();
  }
});
