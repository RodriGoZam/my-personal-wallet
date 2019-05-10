import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cuentas: [{ icon: 'account_balance', nombre: 'ahorros', fondos: 100, route: '/' }, {icon: 'account_balance', nombre: 'comida', fondos: 150, route: '/' }],
    categoriaIngresos: ['Salario', 'Transferencia', 'Otros'],
    categoriaEgresos: ['Expensas', 'Transferencia', 'Otros'],
    ingresos: [],
    egresos: [],
    cuentaActual: { icon: 'account_balance', nombre: 'ahorros', fondos: 100, route: '/' }
  },
  mutations: {
    agregarIngreso (context, nuevoIngreso) {
      context.ingresos.unshift(nuevoIngreso)
    },
    agregarEgreso (context, nuevoEgreso) {
      context.egresos.unshift(nuevoEgreso)
    },
    actualizarSaldo (context, cuentaModificada) {
      context.cuentas.find(cuenta => cuenta.nombre === cuentaModificada.nombre).fondos = cuentaModificada.fondos;
    },
    agregarCategoriaIngreso (context, nuevaCategoria) {
      context.categoriaIngresos.unshift(nuevaCategoria)
    },
    agregarCategoriaEgreso (context, nuevaCategoria) {
      context.categoriaEgresos.unshift(nuevaCategoria)
    },
    editarCuentaNombre (context, cuentas) {
      context.cuentas.find(cuenta => cuenta.nombre === cuentas.nombreAntiguo).nombre = cuentas.nombreNuevo;
      context.cuentaActual = context.cuentas.find(cuenta => cuenta.nombre === cuentas.nombreNuevo)
    },
    addCuenta(context, newCuenta) {
      context.cuentas.push(newCuenta);
    }
  },
  actions: {
    agregarIngreso (context, nuevoIngreso) {
      context.commit('agregarIngreso', nuevoIngreso)
    },
    agregarEgreso (context, nuevoEgreso) {
      context.commit('agregarEgreso', nuevoEgreso)
    },
    actualizarSaldo (context, cuentaModificada) {
      context.commit('actualizarSaldo', cuentaModificada)
    },
    agregarCategoriaIngreso (context, nuevaCategoria) {
      context.commit('agregarCategoriaIngreso', nuevaCategoria)
    },
    agregarCategoriaEgreso (context, nuevaCategoria) {
      context.commit('agregarCategoriaEgreso', nuevaCategoria)
    },
    editarCuentaNombre (context, cuentas) {
      context.commit('editarCuentaNombre', cuentas)
    },
    addCuenta(context, newCuenta) {
      context.commit('addCuenta',newCuenta);
    }
  },
  getters: {
    hacerReporte (state) {
      return state.ingresos.concat(state.egresos)
    },
    obtenerCategorias (state) {
      var cat = state.categoriaIngresos.concat(state.categoriaEgresos)
      for (var i = 0; i < cat.length; i++) {
        for (var j = i + 1; j < cat.length; ++j) {
          if (cat[i] === cat[j]) {
            cat.splice(j--, 1)
          }
        }
      }
      return cat
    },
    obtenerFechas (state) {
      var cat = state.ingresos.concat(state.egresos)
      var fechas = cat.map(dato => dato.fecha)
      return fechas
    }
  },
})
