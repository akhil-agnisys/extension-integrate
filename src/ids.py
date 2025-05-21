
from typing import Literal

def soc_create(a:Literal["top", None]=None,type:Literal["block|bus|interface",None]=None, name=None, inst=None, port=None, param=None, bus:Literal["apb","ahb","axi","axi4full", None]=None,
                   bus_type="initiator|target", define=None, logic=None, mod_port=None, wire=None):
       """
        Create a new block, interface, port, or bus.

        Arguments:
           type (str): The type of the element (block, interface, port, param, bus). Default is 'block'.
           name (str): The name of the block or interface.
           port (dict): Ports of the block (applicable to 'block').
           param (dict): Parameters for the block (applicable to 'block').
           bus (str): The name of the bus (optional).
           bus_type (str): Type of bus (initiator or target).
           top (bool): Mark the block as top.
           define (dict): Define parameters (optional).
           logic (dict): Logic for interface ports (applicable to 'interface').
           mod_port (dict): Modport for interface ports (applicable to 'interface').
           wire (list): List of wires for the block.
        """
       pass

def soc_add(type:Literal["block","bus","interface",None]=None, parent=None, name=None, inst=None, bus=None, bus_type:Literal["initiator","target",None]=None, port=None,
                base=None, size=None, param=None, repeat=None, ifdef=None, ifndef=None, vendor=None,
                library=None, version=None, vlnv=None, abs_vlnv=None):
        """
        Add instances to blocks or buses.

        Arguments:
           type (str): Type of element (block, bus, port).
           parent (str): Parent block name.
           name (str): Name of the block or interface to be added.
           inst (str): Instance name for the block/interface.
           bus (str): Name of bus to connect to.
           bus_type (str): Type of bus (initiator or target).
           port (dict): Port configuration (optional).
           base (str): Base address for the block (optional).
           size (str): Size of the block in hexadecimal (optional).
           param (dict): Parameters to override (optional).
           repeat (int): Repeat instances of the block (optional).
           ifdef/ifndef (str): Conditional defines for instantiation.
           vendor, library, version, vlnv (str): Optional IP-XACT file information.
           abs_vlnv (list): Absolute vendor/library/name/version for bus addition.
        """
        pass

def soc_delete(type, parent=None, inst=None, bus=None, port=None):
        """
        Delete instances, buses, or ports from a parent block.

        Arguments:
           type (str): The type of element to delete (block, bus, port).
           parent (str): Parent block name.
           inst (str): Instance name to delete.
           bus (str): Bus to delete.
           port (list): List of ports to delete.
        """
        pass

def soc_connect(source, dest, wire=None, port=None, tie=None, bus=None, source_prefix=None,
                    dest_prefix=None, source_postfix=None, dest_postfix=None, source_bus_intf=None,
                    dest_bus_intf=None, source_bus=None, dest_bus=None, condition=None, interface=None,
                    source_modport=None, dest_modport=None, file=None):
        """
        Connect source and destination blocks with wire, bus, or port.

        Arguments:
           source (str): Source block or port.
           dest (str): Destination block or port.
           wire (str): Wire name to connect (optional).
           port (str): Port configuration (optional).
           tie (str): Tied value for ports (optional).
           bus (str): Bus name for connection (optional).
           source_prefix, dest_prefix, source_postfix, dest_postfix: Optional prefix/postfix for port names.
           source_bus_intf, dest_bus_intf: Interface names for source and destination blocks.
           source_bus, dest_bus: Bus names or instances.
           condition: Condition for mux (optional).
           interface: Interface name for the connection (optional).
           source_modport, dest_modport: Modports for the connection (optional).
           file: File for connection definition (optional).
        """
        pass

def soc_connect_auto(bus="*", exclude=None, port="*", qualifier=None):
        """
        Automatically connect blocks, buses, or ports.

        Arguments:
           bus (str): Bus name or wildcard for automatic connection.
           exclude (str): Block or port name to exclude.
           port (str): Port name or wildcard for automatic connection.
           qualifier (str): Qualifier for clock/reset connection.
        """
        pass

def soc_disconnect(source, dest):
        """
        Disconnect a source and destination block or port.

        Arguments:
           source (str): Source block or port.
           dest (str): Destination block or port.
        """
        pass

def soc_move(a:Literal["create", None]=None,source=None, dest=None, exclude=None, port_name_format=None):
        """
        Move block instances from one block to another.

        Arguments:
           source (str): Source block instance or list of instances.
           dest (str): Destination block name.
           create (bool): Create the destination block automatically if it doesn't exist.
           exclude (list): Ports to exclude from the move.
           port_name_format (str): Format for port names when moved.
        """
        pass

def soc_flatten(block=None):
        """
        Flatten a block, moving all child instances into the parent block.

        Arguments:
           block (str): Block instance to flatten.
        """
        pass


def soc_read(
    a:Literal["+incdir+","+libext+", None]=None,
    search_path=None,
    file=None,
    file_list=None,
    y=None,
    depth=None,
    
):
    """
    Read RTL or other input files for SoC integration.

    Arguments:
       options (str): Extra options like '+incdir+', '+libext+', etc., in a single string. 
                     Example: "+incdir+<path1>+<path2>+libext+.v+.sv"
       search_path (str): Directory path where input files are located.
                         Default is current working directory.
       file (list): List of input files. Relative paths searched in 'search_path'.
       file_list (str): Filelist containing RTL files or other filelist references.
                       Can include +incdir+, +libext+, -y, -f options.
       inc_dir (str): Directory path(s) where include files (`include) are located.
       include (str): Comma-separated string of instantiated files to include.
       y (str): Source library directory (-y option).
       depth (str): Optional depth level to control nested filelist reading.
    
    Notes:
       Supports environment variables in 'file_list'.
       Supports nested filelists using -f option.
       Filelist can be of any extension.
    """
    pass

def soc_generate(
              a:Literal["relax","strict","compact","explicit","no_include","header_line_comment", None]=None,
              out:Literal["v","sv","IP-XACT","IP-XACT2009","IP-XACT2022", None]=None, 
              dir=None,
              ):
    """
    Generate output files like RTL or IP-XACT.

    Arguments:
       *flags (str): One or more of:
           "relax": Generate output even with errors.
           "strict": Generate output only when no errors occur (default).
           "compact": Generate compact RTL code.
           "explicit": Use localparams for parameterized widths (default).
           "header_line_comment": Make header lines single-line comments.
           "no_include": Remove all `include files from output.
       out (list[str]): Types of output to generate, e.g., ["sv", "IP-XACT"].
       dir (str, optional): Directory to place generated outputs. Defaults to ./ids
    
    Notes:
       `strict` is enabled by default if neither `relax` nor `strict` is passed.
       Compact and explicit modes apply to RTL generation only.
    """
    pass

def soc_graph(block_name):
    """
    Generate a visual or structural graph for the specified block.

    Arguments:
       block_name (str): Name of the block whose graph is to be generated.
    
    Notes:
       Generates a graph showing block hierarchy and connectivity.
    """
    pass

def soc_savegraph(name="name.nlv", dir="dir-name"):
    """
    Save the block diagram generated by soc_graph to a file.

    Keyword Arguments:
       name (str): Name of the output file where the block diagram will be saved (e.g., "my_block.nlv").
       dir  (str): Directory where the diagram file should be saved. Can be relative or absolute path.

    Notes:
       Must be called after soc_graph().
       The file is saved in a format compatible with IDS tools (typically .nlv).
       If 'dir' is not provided, the diagram is saved in the current working directory.
    """
    pass

def soc_dump_csv(name="<block-name|instance-name>", dir="output-path", depth=0):
    """
    Generate a CSV file that captures the connectivity of a block or instance in the design.

    Keyword Arguments:
       name (str, optional): Name of a specific block or instance to dump. If not provided, the current top block's module name is used.
       dir  (str, optional): Directory where the CSV output is saved. Can be a relative or absolute path. 
                            If not specified, a directory named "ids" is created in the script's location.
       depth (int, optional): Depth of hierarchy to include in the connectivity dump.
                                Default: 0 (only top-level connectivity).
                                Set to -1 to dump the entire hierarchy.
    """
    pass
    
def soc_library(
            a:Literal["all","port","param","inst","inst_hier","port_con","bus_con", None]=None,
            name="<block-name|instance-name>"):
    """
    Display design information for a block, instance, or the entire SoC based on provided options.

    Positional Arguments (Optional Switches):
       "all"       : Display all blocks and instances with their parameters, ports, and buses. Can be used with or without the `name` option.
       "port"      : Display port list information. Requires the `name` option.
       "param"     : Display parameter details of the specified block. Requires the `name` option.
       "inst"      : Display instances under the specified block. Requires the `name` option.
       "inst_hier" : Display instance hierarchy of the specified block and its child components. Requires the `name` option.
       "port_con"  : Show port connections (source to destination).
       "bus_con"   : Show bus connections (source to destination).
    """
    pass

def soc_set(
    verbosity="quiet | verbose | debug",
    type="config | error | warning | block",
    code="<code-number>",
    name="<block-name | instance-name>",
    port="<port-name>",
    buswidth="<bus-width>",
    addressunit="<address-unit>",
    fan_in="<number-of-inputs>",
    fan_out="<number-of-outputs>",
    unconnected="n'b0 | n'b1 | n'bx",
    vendor="<vendor-name>",
    library="<library-name>",
    version="<version>",
    created_by="<author-name>"
):
    """
    Configure global or block-level settings and control error/warning behavior.

    Parameters:

       verbosity (str, optional): Sets the console verbosity.
        • "quiet" (default)  : Show only error messages.
        • "verbose"          : Show both error and warning messages.
        • "debug"            : Show errors, warnings, and informational messages.

       type (str, optional): Specifies the category of configuration. Default is "config".
        • "config"  : Global configuration settings (e.g., fan_in, buswidth).
        • "error"   : Control error handling by message code.
        • "warning" : Control warning handling by message code.
        • "block"   : Block-specific settings such as fan-in/out.

       code (str, optional): Message code to convert error to warning or vice-versa.
        Applicable only when type is "error" or "warning".

       name (str, optional): Block or instance name.
        Required when type is "block" to set fan_in/fan_out values.

       port (str, optional): Port name, used with type "block" to assign fan_in/fan_out.

       buswidth (str, optional): Sets the default bus width globally (used with type="config").

       addressunit (str, optional): Sets the default address unit (used with type="config").

       fan_in (str, optional): 
        • With type="config": Applies globally to all future ports.
        • With type="block" : Applies to the block or port specified by `name` and/or `port`.

       fan_out (str, optional): 
        • With type="config": Applies globally to all future ports.
        • With type="block" : Applies to the block or port specified by `name` and/or `port`.

       unconnected (str, optional): Default value for unconnected bits.
        Values: n'b0, n'b1, n'bx (default). Applicable when type="config".

       vendor (str, optional): Sets the vendor field in all generated IP-XACT outputs.

       library (str, optional): Sets the library field in all generated IP-XACT outputs.

       version (str, optional): Sets the version field in all generated IP-XACT outputs.

       created_by (str, optional): Author tag for headers in RTL and IP-XACT outputs.

    """
    pass


def soc_report(
    type="summary | detail",
    name="<block-name | instance-name>",
    dir="<output-directory-path>"
):
    """
    Generates a report for the specified SoC block or instance.

    Parameters:

       type (str, optional): Specifies the report type.
        • "summary" (default): Generates a concise report with top-level information.
        • "detail"           : Generates a detailed report with hierarchy, parameters, ports, buses, etc.

       name (str, optional): Name of the block or instance for which the report is generated.
        If not provided, the top-level block is used by default.

       dir (str, optional): Output directory path (absolute or relative).
        If not specified, a folder named "ids" is created in the script directory and the report is generated there.
    """
    pass

def soc_get_block(parent=None):
    """
    Retrieves blocks or instances from the SoC hierarchy.

    Parameters:

       parent (str, optional): The name of the parent block or instance whose child blocks or instances need to be retrieved.
        • If not specified, top-level blocks or instances are returned.
        • If specified, only direct child blocks or instances under the given parent are returned.

    Returns:
       List of block or instance names depending on the hierarchy.
    """
    pass

def soc_get_bus(block=None, direction:Literal["initiator","target", None]=None, con_status:Literal["connected","unconnected",None]=None):
    """
    Retrieves the buses associated with the specified block instance.

    Parameters:
       block: (str) Name of the block or instance whose buses are to be retrieved.
       direction: (str, optional) Direction of the bus    either 'initiator' or 'target'.
       con_status: (str, optional) Connection status of the bus    either 'connected' or 'unconnected'.

    Returns:
       List of buses (dict) matching the specified conditions.
    """
    pass

def soc_get_port(block=None, direction:Literal["input","output","inout", None]=None, con_status:Literal["connected","unconnected",None]=None):
    """
    Retrieves the buses associated with the specified block instance.

    Parameters:
       block: (str) Name of the block or instance whose buses are to be retrieved.
       direction: (str, optional) Direction of the port    either 'input' ,'output' or 'inout'.
       con_status: (str, optional) Connection status of the port    either 'connected' or 'unconnected'.

    Returns:
       List of ports (dict) matching the specified conditions.
    """
    pass


def soc_clean():
      """
      Used to clean the workspace
      """
      pass