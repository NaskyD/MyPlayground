#version 150

// Task_1_2 - ToDo Begin

uniform mat4 transform;
uniform sampler2D height;

in vec3 a_vertex;

out float tex;

void main()
{
	// Here you need to gather texture coordinates.
	// Tip: note that your terrain might/should be in range [0,1] which 
	// accidentally could be interpreted as texture coordinates ...
	
	// use texture function to access a sampler2D object
	
	// ...
	
	tex = texture(height, a_vertex.xz).x;												//die Höheninformation ist ja in allen Kanälen die gleiche

	gl_Position = transform * vec4(a_vertex.x, tex, a_vertex.z, 1.0);
	
	// Task_1_2 - ToDo End
}
