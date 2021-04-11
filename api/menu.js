const Menu = [
  {header: 'Menú Principal'},
  {
    title: 'Centros de Salud',
    group: 'apps',
    icon: 'business',
    name: 'Dashboard',
    href: '/centros'
  },
  {
    title: 'Servicios',
    group: 'apps',
    icon: 'medical_services',
    name: 'Dashboard',
    href: '/servicios'
  },
  {
    title: 'Doctores',
    group: 'apps',
    icon: 'person',
    name: 'Dashboard',
    href: '/doctor'
  },
  {
    title: 'Pacientes',
    group: 'apps',
    icon: 'personal_injury',
    name: 'Dashboard',
    href: '/pacientes'
  },
  {
    title: 'Histopatología',
    group: 'apps',
    icon: 'person',
    name: 'Dashboard',
    href: '/histopatologia'
  },
  {divider: true},
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
