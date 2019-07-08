'use strict'

const Produto = use('App/Models/Produto')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with produtos
 */
class ProdutoController {

  async index () {
    const produtos = await Produto.all()
    return produtos
  }

  /**
   * Create/save a new produto.
   * POST produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store ({ request, auth }) {
    const data = request.only([
      'descricao',
      'descricao_completa',
      'preco_custo',
      'preco_venda',
      'situacao',
      'estoque'
    ])
    const produto = await Produto.create({ user_id: auth.user.id, ...data })
    return produto
  }

  /**
   * Display a single produto.
   * GET produtos/:id
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const produto = await Produto.findOrFail(params.id)
    return produto
  }

  /**
   * Update produto details.
   * PUT or PATCH produtos/:id
   * 
  */ 
  async update ({ params, request, auth, response }) {

    const produto = await Produto.findOrFail(params.id)

    if(produto.user_id != auth.user.id)
    {
      return response.status(401)
    }

    const data = request.only([
      'descricao',
      'descricao_completa',
      'preco_custo',
      'preco_venda',
      'situacao',
      'estoque'
    ])

    produto.descricao = data.descricao;
    produto.descricao_completa = data.descricao_completa;
    produto.preco_custo = data.preco_custo;
    produto.preco_venda = data.preco_venda;
    produto.situacao = data.situacao;
    produto.estoque = data.estoque;
    await produto.save()
    return produto
  }
  

  /**
   * Delete a produto with id.
   * DELETE produtos/:id
   */
  async destroy ({ params, auth, response }) {
    const produto = await Produto.findOrFail(params.id)
    if(produto.user_id != auth.user.id)
    {
      return response.status(401)
    }
    await produto.delete()
  }
}

module.exports = ProdutoController
