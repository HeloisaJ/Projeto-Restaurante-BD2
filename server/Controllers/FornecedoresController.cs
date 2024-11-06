using Microsoft.AspNetCore.Mvc;
using Pizzaria.Models;
using Pizzaria.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pizzaria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FornecedoresController : ControllerBase
    {
        private readonly FornecedorService _fornecedorService;

        public FornecedoresController(FornecedorService fornecedorService) {
            _fornecedorService = fornecedorService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Fornecedor>>> Get() {
            var fornecedores = await _fornecedorService.GetAllFornecedoresAsync();
            return Ok(fornecedores);
        }
    }
}
