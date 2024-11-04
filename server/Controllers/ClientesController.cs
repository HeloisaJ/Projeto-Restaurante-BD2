using Microsoft.AspNetCore.Mvc;
using Pizzaria.Models;
using Pizzaria.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pizzaria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly ClienteService _clienteService;

        public ClientesController(ClienteService clienteService) {
            _clienteService = clienteService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Cliente>>> Get() {
            var clientes = await _clienteService.GetAllClientesAsync();
            return Ok(clientes);
        }

        [HttpPost]
        public async Task<ActionResult<Cliente>> Post([FromBody] Cliente c){
            if(c == null){
                return BadRequest();
            }

            _clienteService.PostClienteAsync(c);
            return Created();
        }
    }
}
