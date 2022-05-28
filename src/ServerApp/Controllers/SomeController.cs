using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ServerApp
{
    [ApiController]
    public class SomeController : ControllerBase
    {
        [HttpPost("/average")]
        public double Average (double[] array)
        {
            return array.Average();
        }
    }
}
