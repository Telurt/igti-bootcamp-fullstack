// Variáveis Globais
var SearchButton = null;
var SearchInput = null;

var UsersFound = document.querySelector('#UsersFound');
var StatisticFound = document.querySelector('#StatisticFound');

window.addEventListener('load', () => {
  SearchButton = document.querySelector('#SearchButton');
  SearchInput = document.querySelector('#SearchInput');

  FocusInput(SearchInput);

  SearchButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (SearchInput.value === '') {
      UsersFound.innerHTML = '';
      StatisticFound.innerHTML = '';
      const NotFoundUsers = document.querySelector('#NotFoundUsers');
      const NotFoundStatistic = document.querySelector('#NotFoundStatistic');
      NotFoundUsers.innerHTML = 'Nada a ser exibido';
      NotFoundStatistic.innerHTML = 'Nada a ser exibido';
    } else {
      FetchUsers()
        .then((results) => {
          const Users = FilterUser(results, SearchInput.value);
          RenderUser(Users);
          RenderStatistic(Users);
        })
        .catch((error) => {
          console.group('Falha na Requisição da API');
          console.error(error);
          console.groupEnd();
        });
    }
  });
});

// Colhendo os dados da API
async function FetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();
  const ApiUsers = json.results.map((user) => {
    // Utilizando destructing
    let {
      picture: {
        thumbnail
      },
      name: {
        first,
        last
      },
      dob: {
        age
      },
      gender,
    } = user;
    return {
      name: `${first} ${last}`,
      photo: thumbnail,
      age,
      gender,
    };
  });

  return ApiUsers;
}

function FocusInput(Event) {
  Event.focus();
}

function FilterUser(results, Valor) {
  const Users = results.filter((person) => {
    return person.name.toLowerCase().includes(Valor.toLowerCase());
  });

  return Users;
}

function RenderUser(Users) {
  let ListUsersHTML = '<ul style="list-style-type: none;">';
  let CountUsers = 0;

  Users.forEach((person) => {
    const {
      name,
      photo,
      age,
      gender
    } = person;

    const ListAttributeUsers = `
           <li><img class="rounded-circle" src="${photo}" alt="${name}"/> ${name}, ${age}, ${gender}</li>
      `;

    ListUsersHTML += ListAttributeUsers;
    CountUsers += 1;
  });

  ListUsersHTML += '</ul>';
  UsersFound.innerHTML = ListUsersHTML;
  const NotFoundUsers = document.querySelector('#NotFoundUsers');
  NotFoundUsers.innerHTML = '';


  const ResultsFoundUser = document.querySelector('#ResultsFoundUser');
  ResultsFoundUser.innerHTML = CountUsers + ' usuários(s) encontrados()';
}

function RenderStatistic(Users) {
  let ListStatisticHTML = '<ul style="list-style-type: none;">';
  let CountMale = 0;
  let CountFemale = 0;
  let SumAge = 0;
  let AvgAge = 0;
  let CountUsers = 0;
  Users.forEach((person) => {
    const {
      age,
      gender
    } = person;

    if (gender === 'male') {
      CountMale += 1;
    } else {
      CountFemale += 1;
    }

    SumAge += age;
    CountUsers += 1;
  });
  AvgAge = SumAge / CountUsers;
  AvgAge = AvgAge.toFixed(2);
  ListStatisticHTML += `
           <li>Sexo Masculino: <b>${CountMale}</b></li>
           <li>Sexo Feminino: <b>${CountFemale}</b></li>
           <li>Soma das idades: <b>${SumAge}</b></li>
           <li>Média das idades: <b>${AvgAge}</b></li>
           </ul>
      `;
  StatisticFound.innerHTML = ListStatisticHTML;


  const NotFoundStatistic = document.querySelector('#NotFoundStatistic');
  NotFoundStatistic.innerHTML = '';
}